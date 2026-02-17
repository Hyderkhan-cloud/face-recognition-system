import React, {useState} from "react";

function App(){

const [result, setResult] = useState("");

const upload = async (e) => {

const file = e.target.files[0];

const formData = new FormData();

formData.append("image", file);

const res = await fetch("/recognize", {
method:"POST",
body:formData
});

const data = await res.json();

setResult(JSON.stringify(data));

};

return(

<div>

<h1>Face Recognition Dashboard</h1>

<input type="file" onChange={upload}/>

<p>{result}</p>

</div>

);

}

export default App;
