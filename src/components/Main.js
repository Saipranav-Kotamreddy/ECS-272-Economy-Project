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

	const [visible1, setIsVisible1] = useState(true);
	const [visible2, setIsVisible2] = useState(true);
	const [visible3, setIsVisible3] = useState(true);

	const [focus1, setFocus1] = useState(false);
	const [focus2, setFocus2] = useState(false);
	const [focus3, setFocus3] = useState(false);

	const show1 = () => {
	  setIsVisible2(false);
	  setIsVisible3(false);
	  setFocus1(true);
	};

	const show2 = () => {
		setIsVisible1(false);
		setIsVisible3(false);
		setFocus2(true);
	  };

	const show3 = () => {
		setIsVisible1(false);
		setIsVisible2(false);
		setFocus3(true);
	  };

	if (page == 0) {
		return <div className='col'>
			<div id='1' className={`fade-out ${visible1 ? '' : 'hidden'} ${focus1 ? 'focused1' : ''}`} onClick={show1}>
				<IndustryChart  className='industry' startYear={1840} endYear={2000} size='small' animated={false} />
			</div>	
			<div className='row'>
					<div id='2' className={`col fade-out ${visible2 ? '' : 'hidden'} ${focus2 ? 'focused2' : ''}`} onClick={show2}>
						<div className='row2'>
							<UrbanChart period={'1810'} size='small'/>
							<UrbanChart period={'1900'} size='small'/>
						</div>
						<ImmigrationChart startYear={1790} endYear={1900} size='small'/>	
						<CarbonChart startYear={1840} endYear={1910} size='small'/>
										
					</div>
					<div id='3' className={`col fade-out ${visible3 ? '' : 'hidden'} ${focus3 ? 'focused3' : ''}`} onClick={show3}>
						<div className='row2'>
							<GenderChart period={(parseInt('1810')+110).toString()} size='small'/>
							<GenderChart period={(parseInt('1900')+110).toString()} size='small'/>
						</div>
						
						<IncomeChart startYear={1950} endYear={2000} size='small'/>
						<ProductivityChart startYear={1950} endYear={2010} size='small'/>					
					</div>
				</div>
			<button onClick={nextPage}>
				Next Button
			</button>
			</div>		
	}
	else if (page == 1) {
		return <div className='col2 full'>
				<div className='main'>
				<IndustryChart startYear={1840} endYear={2000}  animated={true}/>
				</div>
			
			<button onClick={nextPage}>
				Next Button
			</button>
		</div>
	} else if (page == 2) {
		return <div className='col3'>
		<div className='row'>
		<div className='col'>
			<div className='row2'>
				<UrbanChart period={'1810'} size='medium'/>
				<UrbanChart period={'1900'} size='medium'/>
			</div>
			<ImmigrationChart startYear={1790} endYear={1900} size='medium'/>	
			<CarbonChart startYear={1840} endYear={1910} size='medium'/>
		</div>
		</div><button onClick={nextPage}>
					Next Button
				</button>
			</div>		
	} else if (page == 3) {
		return <div className='col3'>
				<div className='row3'>
					<UrbanChart period={'1810'}/>
					<UrbanChart period={'1900'}/>
				</div>
				<button onClick={nextPage}>
					Next Button
				</button>
			</div>		
	} else if (page == 4) {
		return <div className='col3'>
				<CarbonChart startYear={1840} endYear={1910} width={600} height={500} font1={"16px"} font2="12px"/>
				<button onClick={nextPage}>
					Next Button
				</button>
			</div>		
	} else if (page == 5) {
		return <div className='col3'>
		<div className='row'>
		<div className='col'>
			<div className='row2'>
				<GenderChart period={(parseInt('1810')+110).toString()} size='medium'/>
				<GenderChart period={(parseInt('1900')+110).toString()} size='medium'/>
			</div>
			<div className='incomeMed'>
			<IncomeChart startYear={1950} endYear={2000} size='medium'/>	
			</div>
			<div className='prodMed'>
			<ProductivityChart startYear={1950} endYear={2010} size='medium'/>
			</div>
		</div>
		</div><button onClick={nextPage}>
					Next Button
				</button>
			</div>	
	} else if (page == 6) {
		return <div className='col3'>
		<div className='row3'>
		<GenderChart period={(parseInt('1810')+110).toString()}/>
		<GenderChart period={(parseInt('1900')+110).toString()}/>
		</div>
		<button onClick={nextPage}>
			Next Button
		</button>
		</div>		
	} else if (page == 7) {
		return <div className='col3'>
				<IncomeChart startYear={1910} endYear={2000}/>
				<button onClick={nextPage}>
					Next Button
				</button>
			</div>		
	} else if (page == 8) {
		return <div className='col'>
				<IndustryChart id='1' className='industry' startYear={1840} endYear={2000} size='small'  animated={false} onClick={show1}/>
				<div className='row'>
					<div id='2' className='col' onClick={show2}>
						<div className='row2'>
							<UrbanChart period={'1810'} size='small'/>
							<UrbanChart period={'1900'} size='small'/>
						</div>
						<ImmigrationChart startYear={1790} endYear={1900} size='small'/>	
						<CarbonChart startYear={1840} endYear={1910} size='small'/>
										
					</div>
					<div id='3' className='col' onClick={show3}>
						<div className='row2'>
							<GenderChart period={(parseInt('1810')+110).toString()} size='small'/>
							<GenderChart period={(parseInt('1900')+110).toString()} size='small'/>
						</div>
						
						<IncomeChart startYear={1950} endYear={2000} size='small'/>
						<ProductivityChart startYear={1950} endYear={2010} size='small'/>					
					</div>
				</div>
			<button onClick={nextPage}>
				Next Button
			</button>
			</div>		
	}
		
}

export default Main;