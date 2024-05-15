const socket=io();
const template=`<tr>
    <th>$posizione</th>
    <td><button type="button" id="btn_partita">$username</button></td>
    <td>$stato</td>
</tr>`;
