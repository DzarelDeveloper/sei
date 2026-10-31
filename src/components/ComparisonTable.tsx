import { comparisonReminder, comparisonRows } from '../data/pathways'
import { IconInfo } from './Icons'

export function ComparisonTable() {
  return (
    <div>
      <table className="compare__table">
        <caption className="sr-only">
          Perbandingan jalur SMA dan SMK berdasarkan enam hal
        </caption>
        <thead>
          <tr>
            <th scope="col">Hal yang dibandingkan</th>
            <th scope="col">SMA / Sederajat</th>
            <th scope="col">SMK / Sederajat</th>
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row) => (
            <tr key={row.id}>
              <th scope="row">{row.dimension}</th>
              <td data-label="SMA">
                <span className="compare__cell-title">{row.sma.title}</span>
                {row.sma.copy}
              </td>
              <td data-label="SMK">
                <span className="compare__cell-title">{row.smk.title}</span>
                {row.smk.copy}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="compare__note">
        <IconInfo />
        <span>{comparisonReminder}</span>
      </p>
    </div>
  )
}
