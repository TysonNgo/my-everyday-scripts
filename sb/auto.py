from SB import SB
from time import sleep
from random import randint
import os


def print_and_write_history(line):
	print(line)
	with open("history.txt", "a") as f:
		f.write(line+"\n")

def main():
	cookie = os.environ["SB_COOKIE"]
	my_id = os.environ["SB_ID"]

	sb = SB(cookie)

	can_bet = False
	has_bet = False

	balance = None
	old_balance = None

	print_and_write_history("=====================")

	while not sleep(15):
		sb.set_new_state()
		sb.set_new_update()
		sb.set_bank_html()

		balance = int(sb.update_json[my_id]["b"])
		if old_balance == None:
			old_balance = balance

		mode = sb.get_mode()
		if mode == SB.MODE_TOURNAMENT:
			wager = 1450
		elif mode == SB.MODE_EXHIBITION:
			wager = 5000
		elif mode == SB.MODE_MATCHMAKING:
			wager = 2500

		player = randint(1,2)

		can_bet = sb.can_bet()

		if not can_bet:
			has_bet = False

		if not has_bet and can_bet:
			winner_prev = sb.update_json["status"]

			if winner_prev == "1" or winner_prev == "2":
				p1name_prev = sb.update_json["p1name"]
				p2name_prev = sb.update_json["p2name"]
				winner_prev = (p1name_prev, p2name_prev)[int(winner_prev)-1]

				difference = balance - old_balance
				difference = "+"*(difference>0)+str(difference)

				print_and_write_history("%s vs. %s concluded. %s won. | new balance: %s (%s)" % (
					p1name_prev, p2name_prev, winner_prev, balance, difference))

			p1name = sb.state_json["p1name"]
			p2name = sb.state_json["p2name"]
			sb.place_bet(player, wager)

			print_and_write_history("[%s]" % (["TOURNAMENT","EXHIBITION","MATCHMAKING"][mode],))
			print_and_write_history("%s vs. %s -> $%s on player %s : %s" % (p1name, p2name, wager, player, (p1name,p2name)[player-1]))
				
			has_bet = True
			old_balance = balance


if __name__ == "__main__":
	print("Starting auto SB...")
	main()
