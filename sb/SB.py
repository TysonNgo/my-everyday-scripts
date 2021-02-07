import requests
import re


class SB():
	MODE_TOURNAMENT = 0
	MODE_EXHIBITION = 1
	MODE_MATCHMAKING = 2

	def __init__(self, cookie):
		self.base = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x77\x77\x2e\x73\x61\x6c\x74\x79\x62\x65\x74\x2e\x63\x6f\x6d\x2f"
		self.state = "\x73\x74\x61\x74\x65\x2e\x6a\x73\x6f\x6e"
		self.update = "\x7a\x64\x61\x74\x61\x2e\x6a\x73\x6f\x6e"
		self.options = "\x6f\x70\x74\x69\x6f\x6e\x73"
		self.bet = "\x61\x6a\x61\x78\x5f\x70\x6c\x61\x63\x65\x5f\x62\x65\x74\x2e\x70\x68\x70"
		self.bank = "\x62\x61\x6e\x6b"
		self.headers = {
			"cookie": cookie
		}
		self.bank_html = ""

		self.level = 1
		self.balance = 0

		self.update_json = {}
		self.state_json = {}

	def set_new_state(self):
		self.state_json = requests.get(self.base+self.state).json()

	def set_new_update(self):
		self.update_json = requests.get(self.base+self.update).json()

	def set_bank_html(self):
		self.bank_html = requests.get(self.base+self.bank, headers=self.headers).content

	def can_bet(self):
		return self.state_json["status"] == "open"

	def place_bet(self, player, wager):
		requests.post(self.base+self.bet, headers=self.headers, data={
			"selectedplayer": "player"+str(player),
			"wager": wager
			})

	def set_profile(self):
		"""
		rtype: tuple (level, balance) -> (int, int)
		"""
		html = requests.get(base+options, headers=self.headers).content
		level = "<strong>Level:[\s\S]*?(\d+) <br/><br/>"
		balance = "<strong>Balance:[\s\S]*?([\d,]+) <br/><br/>"
		
		level, balance = [int(n.replace(',','')) for n in re.findall("[\s\S]*?".join([level, balance]), html)[0]]

		self.level = level
		self.balance = balance

	def get_mode(self):
		game_mode = re.findall('Game Mode[\s\S]*?<strong>(.*)?</strong>', self.bank_html)[0].lower()
		
		# remaining = self.state_json['remaining'].lower()
		# if "bracket" in remaining: # ...left in the bracket
		# 	return SB.MODE_TOURNAMENT
		# elif "exhibition" in remaining: # ...exhibition matches left
		# 	return SB.MODE_EXHIBITION
		# elif "tournament" in remaining: # ...until the next tournament
		# 	return SB.MODE_MATCHMAKING

		if game_mode == "tournament":
			return SB.MODE_TOURNAMENT
		elif game_mode == "exhibition":
			return SB.MODE_EXHIBITION
		elif game_mode == "matchmaking":
			return SB.MODE_MATCHMAKING

		return -1

	def get_tournament_balance(self):
		if self.get_mode() == SB.MODE_TOURNAMENT:
			return int(re.findall('<span class="greentext"> \$([\d,]+)', self.bank_html)[0].replace(',',''))
		return 1
