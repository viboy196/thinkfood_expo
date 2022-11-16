import { MonAnTitle } from './MonAnHelper';

// public bool? isBook { get; set; }
// public string? timeBook { get; set; }

const tag ='Đồ ăn';
export type TypeDoAn = {
    id: string,
    name:string,
    info?: string,
    idMonAn?: string,
    listIdThucPhamTieuChuan?:Array<string>,
    idDauBep?:string,
    isPublish?: boolean,
    oderPublish?:number,
    avartarUri?: string,
    listMediaUri?:Array<string>,
    isBook?:boolean,
    timeBook?:string,
    status?:string,
    activeTime?:string
}

