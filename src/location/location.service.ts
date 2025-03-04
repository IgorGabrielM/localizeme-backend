import { Injectable } from '@nestjs/common';
import { db } from '../firebase.service';

@Injectable()
export class LocationService {
  private locationRef = db.ref('locations');

  async saveLocation(
    uuid: string,
    latitude: number,
    longitude: number,
    username: string,
  ) {
    try {
      const userSnapshot = await this.locationRef.child(uuid).once('value');
      let userData = userSnapshot.val();

      if (!userData) {
        userData = {
          friends: [],
        };
      }

      const friends = userData.friends;

      const locationData = {
        latitude,
        longitude,
        timestamp: Date.now(),
        username: username,
        friends: friends,
      };

      await this.locationRef.child(uuid).set(locationData);

      return { message: 'Location saved successfully' };
    } catch (error) {
      console.error('Error saving location:', error);
      throw new Error('Failed to save location');
    }
  }

  async getLocation(uuid: string) {
    const locationSnapshot = await this.locationRef.child(uuid).once('value');
    const location = locationSnapshot.val();

    if (!location) {
      throw new Error('User not found');
    }

    return location;
  }

  async getUserFriends(userUuid: string) {
    try {
      const userSnapshot = await this.locationRef.child(userUuid).once('value');

      if (!userSnapshot.exists()) {
        throw new Error('User not found');
      }

      const userData = userSnapshot.val();
      const friendsUuids = userData?.friends || [];

      const friendsPromises = friendsUuids.map(async (friendUuid: string) => {
        const friendSnapshot = await this.locationRef.child(friendUuid).once('value');

        if (!friendSnapshot.exists()) {
          return null;
        }

        const friendData = friendSnapshot.val();
        return {
          friendUuid,
          latitude: friendData.latitude,
          longitude: friendData.longitude,
          timestamp: friendData.timestamp,
          username: friendData.username,
        };
      });

      const friendsData = await Promise.all(friendsPromises);
      return friendsData.filter(friend => friend !== null);

    } catch (error) {
      console.error('Error fetching user friends:', error);
      throw new Error('Failed to fetch friends');
    }
  }

  async addFriend(userUuid: string, friendUuid: string) {
    try {
      const userRef = this.locationRef.child(userUuid);
      const userSnapshot = await this.locationRef.child(userUuid).once('value');

      if (!userSnapshot.exists()) {
        throw new Error('User not found');
      }

      const userData = userSnapshot.val();
      let friends = userData?.friends || [];

      if (!friends.includes(friendUuid)) {
        friends.push(friendUuid);
        await userRef.update({
          friends: friends,
        });
        return { message: 'Friend added successfully!' };
      } else {
        return { message: 'Friend already added!' };
      }
    } catch (error) {
      console.error('Error adding friend:', error);
      throw new Error('Failed to add friend');
    }
  }
}
