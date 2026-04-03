function DeviceCard({ data }) {
  // Destructuring (Parçalama) burada gerçekleşiyor
  const { marka, model, yil } = data;

  const mesaj = `Modern JS ile ${marka} ${model} (${yil}) cihazımı React üzerinde çalıştırıyorum.`;

  return (
    <div className="card">
      <h3>Cihaz Bilgileri</h3>
      <p className="output">{mesaj}</p>
      <small>Durum: Çalışıyor</small>
    </div>
  );
}

export default DeviceCard;