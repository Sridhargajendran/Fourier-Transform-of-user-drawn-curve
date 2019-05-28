function dft(x) {
  let X = [];
  let N = x.length;
  for (var k = 0; k < N; k++) {
    let re = 0;
    let im = 0;
    for (var n = 0; n < N; n++) {
      let phi = (TWO_PI * n * k) / N;
      re += x[n] * cos(phi);
      im -= x[n] * sin(phi);
    }
    re = re / N;
    im = im / N;
    let freq = k;
    let amp = sqrt(re * re + im * im);
    let phase = atan2(im, re);
    X[k] = { re, im, freq, amp, phase };
  }
  return X;
}
