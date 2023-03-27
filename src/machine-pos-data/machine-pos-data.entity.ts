import { Point } from "geojson";

export class MachinePosData {
    machine_id: string;
    machine_name: string;
    ts: Date;
    position: Point;
};