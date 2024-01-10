import { Pipe, PipeTransform } from '@angular/core';
import { GuildInfo } from './guild-info';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: GuildInfo[], sSearchGuild: string): GuildInfo[] {

    // return empty array if array is falsy
    if (!items) { return []; }

    // return the original array if search text is empty
    if (!sSearchGuild) { return items; }

    // convert the searchText to lower case
    sSearchGuild = sSearchGuild.toLowerCase();

    // retrun the filtered array
    return items.filter(item => {
      if (item && item.name) {
        return item.name.toLowerCase().includes(sSearchGuild);
      }
      return [];
    });
  }
}
