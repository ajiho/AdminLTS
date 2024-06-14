import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
import imageminGifsicle from 'imagemin-gifsicle';
import fs from "fs-extra";




let destination = 'dist/img'

fs.emptydirSync(destination)



const files = await imagemin(['src/img/*'], {
  destination,
  plugins: [
    imageminGifsicle({ interlaced: true }),
    imageminJpegtran(),
    imageminPngquant({
      quality: [0.6, 0.8]
    }),
    imageminSvgo({
      plugins: [{
        name: 'removeViewBox',
        active: false
      }]
    })
  ]
});
