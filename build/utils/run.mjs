import { execa } from 'execa'

export const run = (bin, args, opts = {}) =>
    execa(bin, args, { stdio: 'inherit', ...opts })


 