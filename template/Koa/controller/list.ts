import { Controller, Get, Ip, Req, Query } from '../anotation';
import { Request } from 'koa';

@Controller('/a')
export default class AController {
  @Get('/b')
  bAction(@Req() req: Request, @Ip() ip: string, @Query('a') a: string) {
    console.log(ip, a);
    return 'c';
  }
  @Get('/c')
  cAction() {
    return 'd';
  }
}
