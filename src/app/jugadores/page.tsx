import api from "@/api";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export default async function PlayersPage() {
  const players = await api.player.list();

  return (
    <Table className="m-auto max-w-md border">
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead className="text-center">Partidos</TableHead>
          <TableHead className="text-center">Ganados</TableHead>
          <TableHead className="text-center">Perdidos</TableHead>
          <TableHead className="text-center">Empatados</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map(({name, matches, ties, wins, losses}) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell className="text-center">{matches}</TableCell>
            <TableCell className="text-center">{wins}</TableCell>
            <TableCell className="text-center">{losses}</TableCell>
            <TableCell className="text-center">{ties}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
