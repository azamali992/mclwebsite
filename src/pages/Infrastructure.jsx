import InfraComponent from '../components/Infrastructure';
import Seo from '../components/Seo';

export default function Infrastructure() {
  return (
    <div className="pt-24">
      <Seo
        title="Infrastructure & Production Capacity"
        description="MCL's nationwide infrastructure: Air Separation Unit plants, 35+ filling stations, 12 regional warehouses, an 87,000+ cylinder inventory and a 65+ truck logistics fleet delivering industrial and medical gases across Pakistan."
        path="/infrastructure"
      />
      <InfraComponent />
    </div>
  );
}
