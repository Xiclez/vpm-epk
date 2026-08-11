export const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  // Hash function for random noise generation
  float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
  }

  // Value Noise
  float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix( mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                  mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
  }

  // Fractional Brownian Motion (fBm)
  float fbm(vec2 p) {
      float f = 0.0;
      float amp = 0.5;
      for(int i = 0; i < 5; i++) {
          f += amp * noise(p);
          p *= 2.0;
          amp *= 0.5;
      }
      return f;
  }

  void main() {
      vec2 uv = vUv;

      // 1. SCALE: Multiply the X-axis to create multiple distinct flame columns side-by-side
      vec2 st = uv * vec2(6.0, 2.0);

      // Speed control
      float t = uTime * 1.3;

      // 2. DISTORTION: Create a side-to-side sway that mimics licking flames
      float sway = fbm(st * 1.0 + vec2(0.0, -t * 0.5));
      
      // 3. SCROLL: Move the UVs upward, heavily displaced by the sway
      vec2 scrollUV = st + vec2(sway * 2.0, -t * 1.8);

      // Generate the base texture
      float fireNoise = fbm(scrollUV * 1.5);

      // 4. SHAPE: A simple vertical gradient (solid at bottom, black at top)
      // We use pow() to make the flames taper off sharply rather than fading smoothly
      float verticalGradient = pow(1.0 - uv.y, 1.2);

      float fire = fireNoise * verticalGradient;

      // 5. CONTRAST: This is the secret to the video's look.
      // We aggressively clamp the midtones to create hard edges and deep negative space.
      fire = smoothstep(0.25, 0.75, fire);
      fire = pow(fire, 1.5) * 3.0; // Boost the remaining peaks

      // 6. COLOR: Match the deep blacks and rich oranges of the reference
      vec3 darkRed = vec3(0.5, 0.02, 0.0);
      vec3 brightOrange = vec3(1.0, 0.35, 0.0);
      vec3 yellowTip = vec3(1.0, 0.8, 0.1);

      // Map the boosted intensity back to the colors
      vec3 color = mix(vec3(0.0), darkRed, smoothstep(0.0, 0.3, fire));
      color = mix(color, brightOrange, smoothstep(0.3, 0.7, fire));
      color = mix(color, yellowTip, smoothstep(0.7, 1.0, fire));

      // Optional: Add a subtle, solid bed of fire at the absolute bottom edge
      float bottomGlow = smoothstep(0.1, 0.0, uv.y);
      color = mix(color, brightOrange, bottomGlow * 0.5);

      // Mask out the black areas so it layers cleanly over your background
      float alpha = smoothstep(0.0, 0.2, fire + bottomGlow);

      gl_FragColor = vec4(color, alpha);
  }
`;