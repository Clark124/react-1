import React from 'react';
import './TodoInput.css'
/*export default class TodoInput extends Component {
    render(){
        return <input type="text" value={this.props.content} 
        className="TodoInput"
        onChange={this.changeTitle.bind(this)} 
        onKeyPress={this.submit.bind(this)}/>
    }
    submit(e){
        if(e.key === 'Enter'){
            this.props.onSubmit(e)
        }   
    }
    changeTitle(e){
        this.props.onChange(e)
    }
}*/

function submit (props,e){
    if(e.key==='Enter'){
        props.onSubmit(e)
    }
}

function changeTitle (props,e){
    props.onchange(e)
}

export default function(props){
    return <input type="text" value={props.content}
    className="TodoInput"
    onChange={changeTitle.bind(null,props)}
    onKeyPress={submit.bind(null,props)}/>
    
}