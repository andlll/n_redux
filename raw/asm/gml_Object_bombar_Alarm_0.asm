// gml_Object_bombar_Alarm_0  locals=2 args=0 len=240
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 2
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 617
00000028: conv.i.v
0000002C: call action_if_number(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20B1320
0000004C: push.imm.e 2
00000050: conv.i.v
00000054: call action_if_dice(argc=1)
0000005C: pop.v.v local.__b__
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x20B1320
00000074: push.imm.e 0
00000078: conv.i.v
0000007C: push.imm.e 0
00000080: conv.i.v
00000084: push.imm.e 97
00000088: conv.i.v
0000008C: call action_create_object(argc=3)
00000094: popz
00000098: push.imm.e 0
0000009C: conv.i.v
000000A0: call action_set_relative(argc=1)
000000A8: popz
000000AC: push.imm.e 0
000000B0: conv.i.v
000000B4: push.imm.e 25
000000B8: conv.i.v
000000BC: call action_set_alarm(argc=2)
000000C4: popz
000000C8: push.imm.e 1
000000CC: conv.i.v
000000D0: call action_set_relative(argc=1)
000000D8: popz
000000DC: push.imm.e 0
000000E0: conv.i.v
000000E4: call action_set_relative(argc=1)
000000EC: popz