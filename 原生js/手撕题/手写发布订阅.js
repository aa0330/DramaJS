class PubSub {
	constructor() {
    this.sub={}
	}
	const on = (event, fn) => {
    if(!this.sub?.[event])return
    if(this.sub[event]){
      this.sub[event].push(fn)
    }else{
      this.sub[event] = [fn]
    }
	}

	const emit = (event, data) => {
    if(!this.sub?.[event])return
    for(let task of this.sub[event]){
      task(data)
    }
	}
	const unSub = (event, fn) => {
    if(!this.sub?.[event])return
    this.sub[event]=this.sub[event].filter(item => item!==fn)
	}
}

