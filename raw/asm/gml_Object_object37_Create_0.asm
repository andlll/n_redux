// gml_Object_object37_Create_0  locals=2 args=0 len=184
// locals: arguments, __b__
00000000: push.v y
00000008: neg.v.d
0000000C: push.imm.e 1
00000010: sub.i.v
00000014: pop.v.v depth
0000001C: push.imm.e 4
00000020: conv.i.v
00000024: call action_if_dice(argc=1)
0000002C: pop.v.v local.__b__
00000034: push.local.v local.__b__
0000003C: conv.v.b
00000040: bf 0x213C380
00000044: push.imm.e 3
00000048: conv.i.v
0000004C: push.imm.e 30
00000050: conv.i.v
00000054: call action_set_alarm(argc=2)
0000005C: popz
00000060: push.imm.e 4
00000064: conv.i.v
00000068: push.imm.e 30
0000006C: conv.i.v
00000070: call action_set_alarm(argc=2)
00000078: popz
0000007C: b 0x213C3B8
00000080: push.imm.e 3
00000084: conv.i.v
00000088: push.imm.e 308
0000008C: conv.i.v
00000090: call action_set_alarm(argc=2)
00000098: popz
0000009C: push.imm.e 4
000000A0: conv.i.v
000000A4: push.imm.e 308
000000A8: conv.i.v
000000AC: call action_set_alarm(argc=2)
000000B4: popz