// gml_Object_air_Alarm_0  locals=2 args=0 len=296
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 2
00000018: conv.i.v
0000001C: call action_if_dice(argc=1)
00000024: pop.v.v local.__b__
0000002C: push.local.v local.__b__
00000034: conv.v.b
00000038: bf 0x20B0A74
0000003C: push.imm.e 2
00000040: conv.i.v
00000044: push.imm.e 0
00000048: conv.i.v
0000004C: push.imm.e 617
00000050: conv.i.v
00000054: call action_if_number(argc=3)
0000005C: pop.v.v local.__b__
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x20B0A74
00000074: push.imm.e 0
00000078: conv.i.v
0000007C: push.imm.e 1
00000080: conv.i.v
00000084: push.v desto
0000008C: call action_if_variable(argc=3)
00000094: pop.v.v local.__b__
0000009C: push.local.v local.__b__
000000A4: conv.v.b
000000A8: bf 0x20B0A74
000000AC: push.imm.e 0
000000B0: conv.i.v
000000B4: push.imm.e 0
000000B8: conv.i.v
000000BC: push.imm.e 97
000000C0: conv.i.v
000000C4: call action_create_object(argc=3)
000000CC: popz
000000D0: push.imm.e 0
000000D4: conv.i.v
000000D8: call action_set_relative(argc=1)
000000E0: popz
000000E4: push.imm.e 0
000000E8: conv.i.v
000000EC: push.imm.e 40
000000F0: conv.i.v
000000F4: call action_set_alarm(argc=2)
000000FC: popz
00000100: push.imm.e 1
00000104: conv.i.v
00000108: call action_set_relative(argc=1)
00000110: popz
00000114: push.imm.e 0
00000118: conv.i.v
0000011C: call action_set_relative(argc=1)
00000124: popz