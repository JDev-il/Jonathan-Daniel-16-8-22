import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/services/api.service';

import { Item } from '../../core/interfaces/Item.interface'

/*=============================================
=                   EXAMPLE                   =
=============================================*/
//! REPLACE WITH API! //! REPLACE WITH API! //! REPLACE WITH API! //! REPLACE WITH API!
  export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
    action: string;
  }
  const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', action: 'Archive' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', action: 'Archive'  },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', action: 'Archive'  },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', action: 'Archive'  },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', action: 'Archive'  },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', action: 'Archive'  },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', action: 'Archive'  },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', action: 'Archive'  },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', action: 'Archive'  },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', action: 'Archive'  },
  ];
  //! REPLACE WITH API! //! REPLACE WITH API! //! REPLACE WITH API! //! REPLACE WITH API!
/*============  End of EXAMPLE  =============*/

@Component({
  selector: 'Archives',
  templateUrl: './archives.component.html',
  styleUrls: ['../purchases/purchases-by-items/purchases-by-items.component.scss']
})
export class ArchivesComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort | null;


  itemsTable: Item[] = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA); //! REPLACE WITH API!


  itemsSource = new MatTableDataSource(this.itemsTable);
  //& change between dataSource & itemsSource

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
