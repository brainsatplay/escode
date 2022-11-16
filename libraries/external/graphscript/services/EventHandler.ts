//mini state event handler for arbitrary data event callback handling
//Graph.ts has its own copy of this 

//a graph representing a callstack of nodes which can be arranged arbitrarily with forward and backprop or propagation to wherever
export class EventHandler {

    pushToState={}
    data={}
    triggers={}

    constructor(data?:{[key:string]:any}) { if(typeof data === 'object') this.data = data; }

    setState = (updateObj:{[key:string]:any}) => {
        Object.assign(this.data, updateObj);
        for (const prop of Object.getOwnPropertyNames(updateObj)) {
            if (this.triggers[prop]) this.triggers[prop].forEach((obj) => obj.onchange(this.data[prop]));
        }
        return this.data;
    }
    setValue = (key, value) => {
        this.data[key] = value;
        if(this.triggers[key]) this.triggers[key].forEach((obj) => obj.onchange(this.data[key]));
    }
    subscribeTrigger = (key:string,onchange:(res:any)=>void) => {

        if(key) {
            if(!this.triggers[key]) {
                this.triggers[key] = [];
            }
            let l = this.triggers[key].length;

            this.triggers[key].push({idx:l, onchange});
            const res = this.triggers[key].length-1;
            console.log('Adding Trigger', res, this.triggers[key])
            return res
        } else return undefined;
    }
    unsubscribeTrigger = (key:string,sub?:number) => {

        let triggers = this.triggers[key]

        if (triggers){

            if(sub === undefined) delete this.triggers[key];
            else {
                let idx = undefined;
                let obj = triggers.find((o,i)=>{
                    if(o.idx===sub) {
                        idx = i;
                        return true;
                    }
                });

                console.log('Removing Trigger', obj);

                if(obj) triggers.splice(idx,1);
                
                if(this.onRemoved) this.onRemoved(obj);
                return true;
            }
        }
    }
    subscribeTriggerOnce = (key:string,onchange:(res:any)=>void) => {
        let sub;
        
        let changed = (value) => {
            onchange(value);
            this.unsubscribeTrigger(key,sub);
        }
        sub = this.subscribeTrigger(key,changed);
    }
    getTrigger = (key,sub) => {
        for(const s in this.triggers[key]) {
            if(this.triggers[key][s].idx === sub) return this.triggers[key][s];
        }
    }
    onRemoved;
}


