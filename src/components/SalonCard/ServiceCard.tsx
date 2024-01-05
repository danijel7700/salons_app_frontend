export default function ServiceCard(service: any) {
  return (
    <>
      <div className="serviceDiv">
        <label>{service.service.name}</label>
        <label>{service.service.cost} din</label>
      </div>
    </>
  );
}
