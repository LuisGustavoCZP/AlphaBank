import fs from 'fs';
import fsasync from 'fs/promises';
import { v4 } from 'uuid';

class Database 
{
    private root = `./data`;
    private sequences;
    private data = new Map();

    constructor () 
    {
        if(!fs.existsSync(this.root))
        {
            fs.mkdirSync(this.root)
        }

        const dataTables = fs.readdirSync(this.root);
        dataTables.forEach(dataTable => 
        {
            const table = new Map();
            this.data.set(dataTable, table);
            if(dataTable != "sequences.json")
            {
                dataTable = `${this.root}/${dataTable}`;
                const tableFiles = fs.readdirSync(dataTable);
                tableFiles.forEach(tableFile => 
                {
                    const fileText = fs.readFileSync(`${dataTable}/${tableFile}`, 'utf8');
                    const obj = JSON.parse(fileText);
                    table.set(obj.id, obj);
                });
            }
        });
        
        const seqFileName = `${this.root}/sequences.json`;
        if(fs.existsSync(seqFileName))
        {
            const seqFile = fs.readFileSync(seqFileName, 'utf8');
            this.sequences = JSON.parse(seqFile);
        }
        else 
        {
            this.sequences = {
                ac_serial:200,
                ag_serial:100
            };
            this.updateSequences();
        }
    }

    async table <T> (name : string) : Promise<Map<string, T>>
    {
        return this.data.has(name) ? this.data.get(name) : null
    } 

    async list <T> (table: string) : Promise<T[]>
    {
        const t = await this.table<T>(table);
        return (t?Array(...t.values()):[]);
    }

    async get <T> (table: string, id: string) : Promise<T>
    {
        if(this.data.has(table)) return Object.assign({}, this.data.get(table).get(id));
        else return (null as unknown) as T;
    }

    async select <T> (table: string, attributes : any) : Promise<T[]>
    {
        const array = await this.list<T>(table);
        return array.filter(element => 
        {
            //console.log(table, attributes);
            for (const key in attributes)
            {
                if((element as any)[key] != attributes[key]) return false;
            }
            return true;
        }).map(o => Object.assign({}, o)) || [];
    }

    async insert <T> (table: string, object : any) : Promise<T[]>
    {
        const id = v4();
        object.id = id;
        object.createdAt = new Date().toISOString();
        
        if(!this.data.has(table))
        {
            this.data.set(table, new Map());
        }
        this.data.get(table).set(id, object);
        const p = `${this.root}/${table}`;
        if(!fs.existsSync(p))
        {
            fsasync.mkdir(p);
        }
        fsasync.writeFile(`${p}/${id}.json`, JSON.stringify(object, null, '\t'));
        return [object];
    }

    async update <T> (table: string, info: Partial<T>, filter: {id:string}) : Promise<T[]>
    {
        const {id} = filter;
        if(!this.data.has(table))
        {
            this.data.set(table, new Map());
        }
        const obj = await this.get<T>(table, id);
        for (const k in info)
        {
            (obj as any)[k] = info[k];
        }

        const p = `${this.root}/${table}`;
        if(!fs.existsSync(p))
        {
            fsasync.mkdir(p);
        }
        fsasync.writeFile(`${p}/${id}.json`, JSON.stringify(obj, null, '\t'));
        return [obj];
    }

    async remove <T> (table: string, id: string)
    {
        const t = await this.table(table);
        if(t)
        {
            t.delete(id);
        }
        const p = `${this.root}/${table}`;
        fsasync.rm(`${p}/${id}.json`);
    }

    async updateSequences ()
    {
        fsasync.writeFile(`${this.root}/sequences.json`, JSON.stringify(this.sequences, null, '\t'));
    }

    public async sequenceNext (sequence: string) : Promise<boolean>
    {
        try 
        {
            this.sequences[sequence] ++;
            await this.updateSequences();
            return true;
        }
        catch(e)
        {
            console.log("Sequence Next", e);
            return false;
            //throw new Error("503: service temporarily unavailable");
        }
    }

    public async sequenceSet (sequence: string, value:number) : Promise<boolean>
    {
        try 
        {
            this.sequences[sequence] = value;
            await this.updateSequences();
            return true;
        }
        catch(e)
        {
            console.log("Sequence Set", e);
            return false;
        }
    }

    public async sequenceGet (sequence: string) : Promise<string>
    {
        try 
        {
            const result = this.sequences[sequence];

            /* if(!result.rows || result.rows.length === 0) return "0";
            const seq = result.rows[0];
            const ag = seq.last_value;
            if(!seq.is_called) await this.sequenceNext(sequence); */
            //console.log(ag)
            return `${result}`;
        }
        catch(e)
        {
            console.log("Get Sequence:", e);
            return '-1';
        }
    }
}

export default new Database();