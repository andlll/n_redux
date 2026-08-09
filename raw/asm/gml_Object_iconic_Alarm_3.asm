// gml_Object_iconic_Alarm_3  locals=2 args=0 len=128
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 736
00000014: conv.i.v
00000018: call action_if_number(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21EB2B0
00000038: push.s "nimsavbac"
00000040: conv.s.v
00000044: call action_load_game(argc=1)
0000004C: popz
00000050: b 0x21EB2C8
00000054: push.s "nimsav_easbac"
0000005C: conv.s.v
00000060: call action_load_game(argc=1)
00000068: popz
0000006C: push.imm.e 2
00000070: conv.i.v
00000074: call action_another_room(argc=1)
0000007C: popz