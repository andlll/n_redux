// gml_Object_fujilogo_Alarm_1  locals=1 args=0 len=52
// locals: arguments
00000000: push.s "menusav"
00000008: conv.s.v
0000000C: call action_load_game(argc=1)
00000014: popz
00000018: push.imm.e 2
0000001C: conv.i.v
00000020: push.imm.e 5
00000024: conv.i.v
00000028: call action_set_alarm(argc=2)
00000030: popz