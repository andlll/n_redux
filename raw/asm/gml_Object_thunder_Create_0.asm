// gml_Object_thunder_Create_0  locals=2 args=0 len=196
// locals: arguments, __b__
00000000: push.v y
00000008: neg.v.d
0000000C: push.imm.e 5
00000010: sub.i.v
00000014: pop.v.v depth
0000001C: push.imm.e 2
00000020: conv.i.v
00000024: call action_if_dice(argc=1)
0000002C: pop.v.v local.__b__
00000034: push.local.v local.__b__
0000003C: conv.v.b
00000040: bf 0x21361A4
00000044: push.imm.e 2
00000048: pop.v.i tha
00000050: push.imm.e 1
00000054: conv.i.v
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.imm.e 377
00000064: conv.i.v
00000068: call action_sprite_set(argc=3)
00000070: popz
00000074: b 0x21361B0
00000078: push.imm.e 1
0000007C: pop.v.i tha
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: push.imm.e 30
00000090: conv.i.v
00000094: call action_set_alarm(argc=2)
0000009C: popz
000000A0: push.imm.e 0
000000A4: conv.i.v
000000A8: push.imm.e 0
000000AC: conv.i.v
000000B0: push.imm.e 713
000000B4: conv.i.v
000000B8: call action_create_object(argc=3)
000000C0: popz