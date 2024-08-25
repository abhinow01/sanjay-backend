// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { TtsService } from './tts.service';
// import { CreateTtDto } from './dto/create-tt.dto';
// import { UpdateTtDto } from './dto/update-tt.dto';

// @Controller('tts')
// export class TtsController {
//   constructor(private readonly ttsService: TtsService) {}

//   @Post()
//   create(@Body() createTtDto: CreateTtDto) {
//     return this.ttsService.create(createTtDto);
//   }

//   @Get()
//   findAll() {
//     return this.ttsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.ttsService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateTtDto: UpdateTtDto) {
//     return this.ttsService.update(+id, updateTtDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.ttsService.remove(+id);
//   }
// }
