import { Component } from '@angular/core';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dataSource: Object;

  ad:any;
  at:any;
  
  title(title: any) {
    throw new Error("Method not implemented.");
  }
  constructor(
    private router: Router,
    private hc: HttpClient,
    private ac: ActivatedRoute,
    
    
  ) {}

sendForm(obj:NgForm)
{
  console.log("enterd sendform");
  
  obj=(obj.value);
  this.hc.post('http://localhost:3000/entries',obj).subscribe((res)=>{
    console.log(res);
    
  });
}

  sendMessage(obj1:NgForm) {
    // obj1=obj1.value;
    // console.log(obj1+"enterd sendmessgae");
    let a=[];
    var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
    
    obj1 = obj1.value;
    console.log(obj1);
    
    this.hc.post('http://localhost:3000/data',obj1).subscribe((res) => {
      
      a=res['result'];
          let dist = 0;
    let time = 0;
    let l = a.length,i;
    var  jsonObj=[];
    for (i = 0; i < l; i++) {
      let da=new Date(a[i].date);
      let da1=da.getDay();
        console.log(weekday[da1]);
              let  item = {}
               item ["label"] = weekday[da1];
               item ["value"] = a[i]['distance'];
               jsonObj.push(item);    
    }
   
    for (i = 0; i < l; i++) {
      dist=dist+Number(a[i]['distance']);
      time=time+Number(a[i]['duration']);
    
    }
    let ad= Math.round(dist / l);
    let at=Math.round(dist / time);
    this.ad=ad;
    this.at=at;
    console.log("average distance " + ad.toFixed(2));
    console.log("average speed" + at.toFixed(2));

    
    
console.log(jsonObj);
      const chartData = jsonObj ;
      // STEP 3 - Chart Configuration
      const dataSource = {
        chart: {
          //Set the chart caption
          caption: "Performance in a week",
          //Set the chart subcaption
          
          //Set the x-axis name
          xAxisName: "Days",
          //Set the y-axis name
          yAxisName: "Distance",
          // numberSuffix: "K",
          //Set the theme for your chart
          theme: "fusion"
        },
        // Chart Data - from step 2
        data: chartData
      };
      this.dataSource = dataSource;
      
    });
    console.log(a);
   

  }
}



 
    //STEP 2 - Chart Data
    

