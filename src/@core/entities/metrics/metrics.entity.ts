import { v4 as uuidv4 } from 'uuid';

export interface MetricsPropsDto {
    metrics_internal_id?: string;
    metrics_count_access?: number;
    metrics_created_at?: Date;
    metrics_updated_at?: Date;
    metrics_day?: number;
    metrics_month?: string;
    metrics_year?: number;
    metrics_date_sessions_created?: Date;
}

export class Metrics {
    public readonly metrics_internal_id: string;
    public props: MetricsPropsDto;
    public metrics_created_at?: Date;
    public metrics_updated_at?: Date;

    constructor(
        props: MetricsPropsDto,
        existData: boolean,
        update: boolean,
        metrics_internal_id?: string,
    ) {
        this.metrics_internal_id = metrics_internal_id || uuidv4();
        if (!this.metrics_internal_id) throw new Error(`problem with metrics_internal_id`);

        this.metrics_created_at = new Date();

        const requiredFields = [
            'metrics_count_access',
            'metrics_day',
            'metrics_month',
            'metrics_year'
        ];

        requiredFields.map((e) => {
            if (typeof props[e] == 'string') {
                if (!props[e].trim()) {
                    throw new Error(`${e} cannot be empty. ${e} : ${props[e]}`);
                }
                props[e] = this._normalizeString(props[e]);
            } else {
                if (!props[e] && props[e] !== 0) {
                    throw new Error(`${e} cannot be empty. ${e} : ${props[e]}`);
                }
            }
        });

        if (!props) {
            this.props = {};
        }

        if (props.hasOwnProperty('metrics_created_at')) {
            this.metrics_created_at = props.metrics_created_at;
        }
        if (props.hasOwnProperty('metrics_updated_at')) {
            this.metrics_updated_at = props.metrics_updated_at;
        }

        // create
        if (!existData) {
            props.metrics_created_at = new Date();
            this.metrics_updated_at = new Date();
        } else {
            //update
            if (!update) {
                props.metrics_created_at = new Date();
            }
            this.metrics_updated_at = new Date();
        }

        this.props = {
            ...props,
        };
    }

    static create(props: MetricsPropsDto) {
        return new Metrics(props, false, false);
    }

    static update(props: MetricsPropsDto, metrics_internal_id: string) {
        return new Metrics(props, true, true, metrics_internal_id);
    }

    _normalizeString(text?: string) {
        return text?.toUpperCase();
    }

    get metrics_count_access() {
        return this.props.metrics_count_access;
    }
    set metrics_count_access(value: number) {
        this.props.metrics_count_access = value;
    }

    get metrics_day() {
        return this.props.metrics_day;
    }
    set metrics_day(value: number) {
        this.props.metrics_day = value;
    }

    get metrics_month() {
        return this.props.metrics_month;
    }
    set metrics_month(value: string) {
        this.props.metrics_month = value;
    }

    get metrics_year() {
        return this.props.metrics_year;
    }
    set metrics_year(value: number) {
        this.props.metrics_year = value;
    }

    get metrics_date_sessions_created() {
        return this.props.metrics_date_sessions_created;
    }
    set metrics_date_sessions_created(value: Date) {
        this.props.metrics_date_sessions_created = value;
    }

    toJSON() {
        return {
            metrics_internal_id: this.metrics_internal_id,
            ...this.props,
            metrics_created_at: this.metrics_created_at,
            metrics_updated_at: this.metrics_updated_at,
        };
    }
}
