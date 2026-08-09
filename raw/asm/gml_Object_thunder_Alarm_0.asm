// gml_Object_thunder_Alarm_0  locals=2 args=0 len=212
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: push.imm.e 15
0000000C: conv.i.v
00000010: call action_set_alarm(argc=2)
00000018: popz
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 1
00000028: conv.i.v
0000002C: push.v tha
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x2136274
00000054: push.imm.e 1
00000058: conv.i.v
0000005C: push.imm.e 0
00000060: conv.i.v
00000064: push.imm.e 376
00000068: conv.i.v
0000006C: call action_sprite_set(argc=3)
00000074: popz
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 2
00000084: conv.i.v
00000088: push.v tha
00000090: call action_if_variable(argc=3)
00000098: pop.v.v local.__b__
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x21362D0
000000B0: push.imm.e 1
000000B4: conv.i.v
000000B8: push.imm.e 0
000000BC: conv.i.v
000000C0: push.imm.e 378
000000C4: conv.i.v
000000C8: call action_sprite_set(argc=3)
000000D0: popz