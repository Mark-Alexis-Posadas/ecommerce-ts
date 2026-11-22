const currency=new Intl.NumberFormat('en-PH',{style:'currency',currency:'PHP'});
export const formatCentavos=(value:number|null)=>value===null?'Unavailable':currency.format(value/100);
