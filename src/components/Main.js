import logo from '../logo.svg';
import '../App.css';
import UrbanChart from './UrbanChart.js'
import ChoosePeriod from './choosePeriod.js'
import IndustryChart from './IndustryChart';
import CarbonChart from './CarbonChart';
import ImmigrationChart from './ImmigrationChart';
import IncomeChart from './IncomeChart';
import GenderChart from './GenderChart';
import ProductivityChart from './ProductivityChart';

import React, { useState, useRef, useEffect } from "react";


const Main = () => {
	const [page, setPage] = useState(0);

	function nextPage() {
		setPage(page+1);
		return
	}

	function prevPage() {
		setPage(page-1);
		return
	}

	const [visible1, setVisible1] = useState(true);
	const [visible2, setVisible2] = useState(true);
	const [visible3, setVisible3] = useState(true);
	const [visible4, setVisible4] = useState(true);
	const [visible5, setVisible5] = useState(true);
	const [visible6, setVisible6] = useState(true);
	const [visible7, setVisible7] = useState(true);
	const [visible8, setVisible8] = useState(true);
	const [visible9, setVisible9] = useState(true);	

	const [focus1, setFocus1] = useState(false);
	const [focus2, setFocus2] = useState(false);
	const [focus3, setFocus3] = useState(false);
	const [focus4, setFocus4] = useState(false);
	const [focus5, setFocus5] = useState(false);
	const [focus6, setFocus6] = useState(false);
	const [focus7, setFocus7] = useState(false);
	const [focus8, setFocus8] = useState(false);
	const [focus9, setFocus9] = useState(false);

	const [btnOn, setBtnOn] = useState(false);
	const [txtOn, settxtOn] = useState(true);


	const show1 = () => {
		if (focus1 == false & focus2 != true & focus3 != true) {
		setVisible2(false);
		setVisible3(false);
		setFocus1(true);
		setBtnOn(true);
		settxtOn(false);
		}
	};

	const show2 = () => {
		if (focus2 == false & focus1 != true & focus3 != true) {
			setVisible1(false);
			setVisible3(false);
			setFocus2(true);
			setBtnOn(true);
		}
	};

	const show3 = () => {
		if (focus3 == false & focus1 != true & focus2 != true) {
			setVisible1(false);
			setVisible2(false);
			setFocus3(true);
			setBtnOn(true);
		}
	  };
	const show4 = () => {
		console.log('calling show4');
		if (focus2 == false) {
			return
		} else {
			setVisible5(false);
			setVisible6(false);
			setFocus4(true);
			settxtOn(false);
		}
	}

	const show5 = () => {
		console.log('calling show5');
		if (focus2 == false) {
			console.log('focus2 == false');
			return
		} else {
			console.log('changing states')
			setVisible4(false);
			setVisible6(false);
			setFocus5(true);
			settxtOn(false);
		}
	}
	const show6 = () => {
		console.log('calling show6');
		console.log(focus6);
		if (focus2 == false) {
			console.log('focus2 == false');
			return
		} else if(focus6 == false) {
			console.log('Changing states');
			setVisible4(false);
			setVisible5(false);
			setFocus6(true);
			settxtOn(false);
		}
	}

	const show7 = () => {
		console.log('calling show7');
		if (focus3 == false) {
			return
		} else {
			setVisible8(false);
			setVisible9(false);
			setFocus7(true);
			settxtOn(false);
		}
	}
	const show8 = () => {
		if (focus3 == false) {
			return
		} else {
			setVisible7(false);
			setVisible9(false);
			setFocus8(true);
			settxtOn(false);
		}
	}
	const show9 = () => {
		if (focus3 == false) {
			return
		} else {
			setVisible7(false);
			setVisible8(false);
			setFocus9(true);
			settxtOn(false);
		}
	}

	  function zoomOut() {
		settxtOn(true);
		if (focus4 == true) {
			setVisible5(true);
			setVisible6(true);
			setFocus4(false);
			return
		} else if (focus5 == true) {
			setVisible4(true);
			setVisible6(true);
			setFocus5(false);
			return
		} else if (focus6 == true) {
			setVisible4(true);
			setVisible5(true);
			setFocus6(false);
			return
		} else if (focus7 == true) {
			setVisible8(true);
			setVisible9(true);
			setFocus7(false);
			return
		} else if (focus8 == true) {
			setVisible7(true);
			setVisible9(true);
			setFocus8(false);
			return
		} else if (focus9 == true) {
			setVisible7(true);
			setVisible8(true);
			setFocus9(false);
			return
		}



		setBtnOn(false);
		if (visible1 == true) {
			setFocus1(false);
			setVisible2(true);
			setVisible3(true);
		} else if (visible2 == true) {
			setFocus2(false);
			setVisible1(true);
			setVisible3(true);
		} else if (visible3 == true) {
			setFocus3(false);
			setVisible1(true);
			setVisible2(true);
		}
	  };	  

	let caption1a = 'The American workforce has gone through massive shifts over the past two centuries. They can be broken down into two major periods.'
	let caption1b = 'Initially the majority of Americans were subsistence farmers working in Agriculture.';
	let caption1c = 'Industrialization began in the 19th century and saw an increase in manufacturing jobs.';
	let caption1d = 'Later in the 20th century manufacturing stagnated as the country transitioned to the modern service based economy we have today.';
	
	let caption2 = 'As living on the farm became less necessary, workers began migrating to cities. This trend of urbanization began in the 19th century and continues to today.';
	
	let caption3 = 'Previously the value of immigration was limited as the increased labor was offset significantly by the extra farming required to feed them. After industrialization food was easier to produce and surplus labor could be effetively utlized in manufacturing. This chart shows the sudden spike in immigrants proportion of population growth.'
	
	let caption4 = 'In hindsight we now recognize the environmental impacts of industrialization. The massive economic growth came at the cost of our environment. The impact on our planet likely cannot be reversed.'
	
	let caption5 = 'Prior to this period women were relegated to houswork and some limited occupations. Today women acoount for nearly half the workforce. Although there has been a lot of progress women are still underepresented in positoilns of power and potentially recieve less pay for the same work(estimates vary).'
	
	let caption6 = 'Today there is fierce debates over rising income inequality in America. Over time a larger percentage of wealth is being concentrated in the hands of fewer people. This garners much attention and critique however proponents argue that the rising inequality is offset by increased economic growth and prosperity for all.'
	
	let caption7 = 'Technological advancements such as computers made workers more productive. Traditionally this was thought to increase wages. However in recent decades wages have stagnated while productivity has increased significantly. This will only become a larger issue with the emergance of Artificial Inteligence in the workplace.'
	
	if (page == 0) {
		return <div className='row center'>
					<div className='center2'>
						<h1>The Economic Evolution of America</h1>
						<h2>Two Centuries of Progress and Adaptation</h2>
					</div>
					<button className='nxtbtn' onClick={nextPage}>
					<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
					</button>
					</div>
	}
	else if (page == 1) {
		return <div>
		<button className='prevbtn' onClick={prevPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg></button>
		<div className='slide col2 full'>
				<div className='main'>
				<IndustryChart startYear={1840} endYear={2000} animated={true}/>
				</div>
			
			<p>{caption1a}</p>
			<p>{caption1b}</p>
			<p>{caption1c}</p>
			<p>{caption1d}</p>
		</div>
		<button className='nxtbtn' onClick={nextPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
		</button>
		</div>
	} else if (page == 2) {
		return <div className='row center'>
		<img src='images/Background1.png' className='bg1'/>
		<button className='prevbtn' onClick={prevPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg></button>
		<div className='center2'>
			<h1>Industrialization</h1>
			<h2>From Farm to Factory</h2>
		</div>
		<button className='nxtbtn' onClick={nextPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
		</button>
		</div>
	 } else if (page == 3) {
		return <div>
		<img src='images/Background1.png' className='bg'/>
		<button className='prevbtn' onClick={prevPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg></button>
		<div className='col4'>
		<div className='row'>
		<div className='col'>
			<div className='row6'>
				<UrbanChart period={'1810'} size='medium' legend={false}/>
				<div className='rightChart'>
					<UrbanChart period={'1900'} size='medium' legend={true}/>
				</div>
				</div>
			<ImmigrationChart startYear={1790} endYear={1900} size='medium'/>	
			<CarbonChart startYear={1840} endYear={1910} size='medium'/>
		</div>
		</div>				
		<button className='nxtbtn' onClick={nextPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
		</button>
			</div>	
			</div>	
	} else if (page == 4) {
		return <div>
		<img src='images/Background1.png' className='bg'/>
		<button className='prevbtn' onClick={prevPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg></button>
		<div className='col4'>
				<div className='row5'>
					<UrbanChart period={'1810'} legend={false}/>
					<UrbanChart period={'1900'} legend={true}/>
				</div>
				<p>{caption2}</p>
				<button className='nxtbtn' onClick={nextPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
		</button>
			</div>
			</div>		
	} else if (page == 5) {
		return <div>
		<img src='images/Background1.png' className='bg'/>
		<div className='col4'>
		
		<button className='prevbtn' onClick={prevPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg></button>
		<ImmigrationChart startYear={1790} endYear={1900}/>	
		<p>{caption3}</p>
		<button className='nxtbtn' onClick={nextPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
		</button>
		</div>
		</div>
	} else if (page == 6) {
		return <div>
		<img src='images/Background1.png' className='bg'/>
		<div className='col4'>
		
		<button className='prevbtn' onClick={prevPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg></button>
		<CarbonChart startYear={1840} endYear={1910} width={600} height={500} font1={"16px"} font2="12px"/>
		<p>{caption4}</p>
		<button className='nxtbtn' onClick={nextPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
		</button>
		</div>
			</div>		
	} else if (page == 7) {
		return <div className='row center'>
		<img src='images/Background2.png' className='bg1'/>
		<button className='prevbtn' onClick={prevPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg></button>
		<div className='center2'>
			<h1>The Modern Economy</h1>
			<h2>Post-War Era</h2>
		</div>
		<button className='nxtbtn' onClick={nextPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
		</button>
		</div>
	 } else if (page == 8) {
		return <div>
		<img src='images/Background2.png' className='bg'/>
		<button className='prevbtn' onClick={prevPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg></button>
		<div className='col4'>
		<div className='row'>
		<div className='col'>
			<div className='row6'>
				<GenderChart period={(parseInt('1810')+110).toString()} size='medium' legend={false}/>
				<div className='rightChart'>
					<GenderChart period={(parseInt('1900')+110).toString()} size='medium' legend={true}/>
				</div>
			</div>
			<div className='incomeMed'>
			<IncomeChart startYear={1950} endYear={2000} size='medium'/>	
			</div>
			<div className='prodMed'>
			<ProductivityChart startYear={1950} endYear={2010} size='medium'/>
			</div>
		</div>
		</div>
		<button className='nxtbtn' onClick={nextPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
		</button>
		</div>
			</div>	
	} else if (page == 9) {
		return <div>
		<img src='images/Background2.png' className='bg'/>
		<button className='prevbtn' onClick={prevPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg></button>
		<div className='col4'>
		<div className='row5'>
		<GenderChart period={(parseInt('1810')+110).toString()} legend={false}/>
		<GenderChart period={(parseInt('1900')+110).toString()} legend={true}/>
		</div>
		<p>{caption5}</p>
		<button className='nxtbtn' onClick={nextPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
		</button>
		</div>
		</div>		
	} else if (page == 10) {
		return <div>
		<img src='images/Background2.png' className='bg'/>
		<button className='prevbtn' onClick={prevPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg></button>
		<div className='col3'>
				<IncomeChart startYear={1950} endYear={2000}/>
				<p>{caption6}</p>
				<button className='nxtbtn' onClick={nextPage}>
				<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
				</button>
				</div>
			</div>		
	} else if (page == 11) {
		return <div>
		<img src='images/Background2.png' className='bg'/>
		<button className='prevbtn' onClick={prevPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg></button>
		<div className='col4'>
				<ProductivityChart startYear={1950} endYear={2010}/>
				<p>{caption7}</p>
				<button className='nxtbtn' onClick={nextPage}>
				<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
				</button>
				</div>
			</div>
	} else if (page == 12) {
		return <div className='row center'>
		<img src='images/Background3.png' className='bg1'/>
		<button className='prevbtn' onClick={prevPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg></button>
		<div className='center2'>
			<h1>The 21st Century</h1>
			<h2>???</h2>
		</div>
		<button className='nxtbtn' onClick={nextPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
		</button>
		</div>
	 } else if (page == 13) {
		return <div className='row center'>
		<img src='images/Background3.png' className='bg'/>
		<button className='prevbtn' onClick={prevPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg></button>
		<div className='center2'>
			<div className='row3'>
			<img className='img1' src="images/AIArticle.png"/>
			<img className='img2' src="images/LaborArticle.png"/>
			</div>
		</div>
			<button className='nxtbtn' onClick={nextPage}>
		<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
		</button>
		</div>
	 } else if (page == 14) {
		return <div className='col'>
			<div id='1' className={`fade-out ${visible1 ? '' : 'hidden'} ${focus1 ? 'focused1' : 'unfocused1'}`} onClick={show1}>
				<IndustryChart  className='industry' startYear={1840} endYear={2000} size='small'/>
			</div>	
			<div className='row'>
					<div id='2' className={`col fade-out ${visible2 ? '' : 'hidden'} ${focus2 ? 'focused2' : 'unfocused2'}`} onClick={show2}>
						<div id='4' className={`row2 fade-out ${visible4&visible2 ? '' : 'hidden'} ${focus4 ? 'focused4' : 'unfocused4'}`} onClick={show4}>
							<UrbanChart period={'1810'} size='small' legend={false}/>
							<div className='rightChart'>
							<UrbanChart period={'1900'} size='small' legend={true}/>
							</div>
							
						</div>
						<div id='5' onClick={show5} className={`fade-out ${visible5&visible2 ? '' : 'hidden'} ${focus5 ? 'focused5' : 'unfocused5'}`}>
							<ImmigrationChart  startYear={1790} endYear={1900} size='small'/>
						</div>
						<div id='6' onClick={show6} className={`fade-out ${visible6&visible2 ? '' : 'hidden'} ${focus6 ? 'focused6' : 'unfocused6'}`}>
							<CarbonChart  startYear={1840} endYear={1910} size='small'/>
						</div>			
					</div>
					<div id='3' className={`col fade-out ${visible3 ? '' : 'hidden'} ${focus3 ? 'focused3' : 'unfocused3'}`} onClick={show3}>
						<div id='7' className={`row2 fade-out ${visible7&visible3 ? '' : 'hidden'} ${focus7 ? 'focused7' : 'unfocused7'}`} onClick={show7}>
							<div>
							{visible7&visible3 && (
							<GenderChart period={(parseInt('1810')+110).toString()} size='small' legend={false}/>)}	
							</div>
							<div>
							<div className='rightChart'>
							{visible7&visible3 && (
							<GenderChart period={(parseInt('1900')+110).toString()} size='small' legend={true}/>)}	
							</div>
							</div>
							</div>
						<div id='8' className={`fade-out ${visible8&visible3 ? '' : 'hidden'} ${focus8 ? 'focused8' : 'unfocused8'}`} onClick={show8}>
						{visible8&&visible3 && (<IncomeChart id='8' startYear={1950} endYear={2000} size='small' className={`${visible8&visible3 ? '' : 'hidden'}`}/>)}
						</div>
						<div id='9' className={`fade-out ${visible9&visible3 ? '' : 'hidden'} ${focus9 ? 'focused9' : 'unfocused9'}`} onClick={show9}>
						{visible9&&visible3 && (<ProductivityChart id='9' startYear={1950} endYear={2010} size='small' className={`${visible9&visible3 ? '' : 'hidden'}`}/>)}					
						</div>
						</div>
				</div>
			<button className={`rtnbtn ${btnOn ? '' : 'hidden'}`} onClick={zoomOut}>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-zoom-out" viewBox="0 0 16 16">
				<path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
				<path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/>
				<path fill-rule="evenodd" d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
				</svg>
			</button>
			<p2 className={`${txtOn ? '' : 'hidden'}`}>Click on any section/chart to zoom in.</p2>
			</div>				
	}
		
}

export default Main;