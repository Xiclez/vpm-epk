/**
 * Procedural ember/smoke field. Atmospheric, not literal fire.
 *
 * Design constraints baked into the composition:
 *  - the central reading column is actively darkened (uCenterFalloff)
 *  - brightness lives at the edges and near the bottom
 *  - warm white appears only at the hottest cores, and only briefly
 */

export const flameVertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  // Full-screen quad, independent of the camera.
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

export function buildFlameFragmentShader(octaves: number): string {
  return /* glsl */ `
varying vec2 vUv;

uniform float uTime;
uniform vec2  uResolution;
uniform float uScroll;
uniform vec2  uPointer;
uniform float uBoost;

uniform float uSpeed;
uniform float uIntensity;
uniform float uDistortion;
uniform float uEmbers;
uniform float uCenterFalloff;
uniform float uScrollResponse;
uniform float uPointerResponse;
uniform float uBoostAmount;

uniform vec3 uColorBase;
uniform vec3 uColorDeep;
uniform vec3 uColorFlame;
uniform vec3 uColorEmber;
uniform vec3 uColorWarm;

#define OCTAVES ${octaves}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;

  for (int i = 0; i < OCTAVES; i++) {
    sum += amp * valueNoise(p);
    p *= 2.02;
    amp *= 0.5;
  }

  return sum;
}

/** Sparse rising specks. Cheap: one 3x3 cell neighbourhood. */
float embers(vec2 uv, float t) {
  float acc = 0.0;
  vec2 gv = uv * vec2(9.0, 5.0);
  vec2 id = floor(gv);
  vec2 f = fract(gv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offs = vec2(float(x), float(y));
      vec2 cid = id + offs;
      float r = hash21(cid);

      // Only a minority of cells ever carry an ember.
      if (r < 0.62) continue;

      float rise = 0.25 + r * 0.55;
      float py = fract(r * 7.31 - t * rise);
      vec2 pos = vec2(hash21(cid + 3.77), py);

      float d = length((f - offs - pos) * vec2(1.0, 0.5));
      acc += smoothstep(0.06, 0.0, d) * (1.0 - py);
    }
  }

  return acc;
}

void main() {
  vec2 uv = vUv;
  float aspect = max(uResolution.x, 1.0) / max(uResolution.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);

  float t = uTime * uSpeed;

  // --- heat distortion (domain warp) -------------------------------------
  vec2 warp = vec2(
    fbm(p * 2.1 + vec2(0.0, -t * 1.7)),
    fbm(p * 2.1 + vec2(5.2, -t * 1.4 + 1.3))
  );
  vec2 q = p + (warp - 0.5) * uDistortion;

  // --- flowing field ------------------------------------------------------
  float body  = fbm(q * vec2(1.7, 0.95) + vec2(0.0, -t * 3.0));
  float smoke = fbm(q * 0.85 + vec2(t * 0.3, -t * 1.05));

  // --- spatial masking: edges hot, centre dark ---------------------------
  float cx = clamp(abs(uv.x - 0.5) * 2.0, 0.0, 1.0);
  // smoothstep (not pow) so activity is confined to the outer margins and the
  // full-width reading column stays dark.
  float edge   = smoothstep(0.55, 1.0, cx);
  float bottom = smoothstep(0.7, 0.0, uv.y);
  float top    = smoothstep(0.88, 1.0, uv.y) * 0.28;

  float mask = clamp(edge * 1.0 + bottom * 0.32 + top, 0.0, 1.35);
  float centre = mix(1.0, 0.14, pow(1.0 - cx, uCenterFalloff));

  float heat = body * 0.68 + smoke * 0.42;
  heat *= mask * centre;
  heat = pow(clamp(heat, 0.0, 1.0), 1.65);

  // --- reactive terms ----------------------------------------------------
  float scrollTerm = 1.0 + uScroll * uScrollResponse;
  float boostTerm  = 1.0 + uBoost * uBoostAmount;
  heat *= uIntensity * scrollTerm * boostTerm;

  // Very subtle pointer warmth (desktop only; uPointer stays centred on touch).
  float pd = distance(p, vec2(uPointer.x * aspect, uPointer.y));
  heat += uPointerResponse * exp(-pd * pd * 5.0) * heat;

  heat = clamp(heat, 0.0, 1.0);

  // --- colour ramp -------------------------------------------------------
  vec3 col = uColorBase;
  col = mix(col, uColorDeep,  smoothstep(0.02, 0.34, heat));
  col = mix(col, uColorFlame, smoothstep(0.30, 0.70, heat));
  col = mix(col, uColorEmber, smoothstep(0.62, 0.92, heat));
  col = mix(col, uColorWarm,  smoothstep(0.93, 1.0, heat) * 0.45);

  // --- embers ------------------------------------------------------------
  float sparks = embers(uv, t * 4.0) * uEmbers * (0.35 + edge * 0.9);
  col += mix(uColorEmber, uColorWarm, 0.3) * sparks * boostTerm;

  // Dither to kill banding across the large dark areas.
  col += (hash21(uv * uResolution + t) - 0.5) * 0.012;

  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`
}
