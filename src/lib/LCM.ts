// Euclidean algorithm as per https://codility.com/media/train/10-Gcd.pdf
function GCD(a: number, b: number): number {
    if (a <= 0 || b <= 0) {
        return 0;
    }

    if ((a % b) === 0) {
        return b;
    } else {
        return GCD(b, a % b);
    }
}

/* Determines the lowest common multiple of integers a and b */
function LCM(a: number, b: number): number {
    if (a <= 0 || b <= 0) {
        return 0;
    }

    return (a * b) / GCD(a, b);
}

export default LCM;