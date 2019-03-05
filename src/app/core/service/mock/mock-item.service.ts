
import { Observable,of } from 'rxjs';
import { Item } from '../../model/item.model';

const ITEM_OBJECTS: Item[] = [];
export class MockItemService {
  getItems(): Observable<Item[]> {
    return of(ITEM_OBJECTS);
  }

  deleteItem(id: string) {
    return "200";
  }
  constructor() { }
}
