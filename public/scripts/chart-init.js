document.addEventListener('DOMContentLoaded', function() {
  if (typeof Chart === 'undefined') return;
  Chart.defaults.color = '#888896';
  Chart.defaults.borderColor = '#2e2e38';
  Chart.defaults.font.family = "'IBM Plex Sans', system-ui, sans-serif";
  Chart.defaults.font.size = 12;
  document.querySelectorAll('[data-chart-config]').forEach(function(canvas) {
    try {
      var config = JSON.parse(canvas.dataset.chartConfig);
      new Chart(canvas, config);
    } catch (e) {
      console.warn('Chart init failed for', canvas.id, e);
    }
  });
});
