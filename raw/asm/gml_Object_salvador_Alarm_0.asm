// gml_Object_salvador_Alarm_0  locals=2 args=0 len=232
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 8
00000014: conv.i.v
00000018: call action_if_number(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x20CA040
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 7
0000004C: conv.i.v
00000050: call action_if_number(argc=3)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x20CA040
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 736
00000084: conv.i.v
00000088: call action_if_number(argc=3)
00000090: pop.v.v local.__b__
00000098: push.local.v local.__b__
000000A0: conv.v.b
000000A4: bf 0x20CA028
000000A8: push.s "nimsavbac"
000000B0: conv.s.v
000000B4: call action_save_game(argc=1)
000000BC: popz
000000C0: b 0x20CA040
000000C4: push.s "nimsav_easbac"
000000CC: conv.s.v
000000D0: call action_save_game(argc=1)
000000D8: popz
000000DC: call action_kill_object(argc=0)
000000E4: popz