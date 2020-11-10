import { Controller, Post } from '../anotation';

@Controller('/goods')
export default class GoodsController {
  @Post('/add')
  addAction() {
    return { code: 0, success: true };
  }
}
