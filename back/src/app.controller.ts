import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('')
export class AppController {
  @ApiTags('Images')
  @Get('/images/avatar/:path')
  async getAvatar(@Param('path') path: string, @Res() res: Response) {
    const imagePath = 'images/avatar/' + path;

    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath, { root: '.' });
    } else {
      res.sendStatus(404);
    }
  }
}
