import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from '../models/location.model';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('save/:uuid')
  async saveLocation(
    @Param('uuid') uuid: string,
    @Body() locationData: Location,
  ) {
    return this.locationService.saveLocation(
      uuid,
      locationData.latitude,
      locationData.longitude,
      locationData.username,
    );
  }

  @Get('get/:uuid')
  async getLocation(@Param('uuid') uuid: string) {
    return this.locationService.getLocation(uuid);
  }

  @Post('addFriend')
  async addFriend(@Body() data: { userUuid: string; friendUuid: string }) {
    const { userUuid, friendUuid } = data;
    return this.locationService.addFriend(userUuid, friendUuid);
  }

  @Get('getUserFriends/:uuid')
  async getUserFriends(@Param('uuid') uuid: string) {
    try {
      const friends = await this.locationService.getUserFriends(uuid);
      return friends;
    } catch (error) {
      console.error('Erro ao buscar amigos:', error);
      throw new Error('Failed to get user friends');
    }
  }
}
