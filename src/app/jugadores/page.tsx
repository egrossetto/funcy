import api from "@/api";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export default async function PlayersPage() {
  const players = await api.player.list();

  return (
    <Table className="m-auto max-w-md border">
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Partidos</TableHead>
          <TableHead className="text-center">Empatados</TableHead>
          <TableHead className="text-right">Ganados</TableHead>
          <TableHead className="text-right">Perdidos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map(({name, matches, ties, wins, losses}) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell>{matches}</TableCell>
            <TableCell className="text-center">{ties}</TableCell>
            <TableCell className="text-right">{wins}</TableCell>
            <TableCell className="text-right">{losses}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
