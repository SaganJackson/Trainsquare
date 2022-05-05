import * as Yup from "yup";

const inventorySchema = Yup.object().shape({
    workshopId: Yup.number().min(1).required('WorkshopId is Required'),
    quantity: Yup.number().min(1).required('Quantity is Required'),
    basePrice: Yup.number().min(1).required('Base Price is Required'),
    
});

export default inventorySchema;

