const socket=io();
const template=`<tr>
    <th>$posizione</th>
    <td><button type="button" id="btn_partita"><a href="partita.html">$username</a></button></td>
    <td>$stato</td>
</tr>`;
