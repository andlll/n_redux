// gml_Object_banca1_light_Create_0  locals=2 args=0 len=224
// locals: arguments, __b__
00000000: push.v y
00000008: neg.v.d
0000000C: push.imm.e 1
00000010: sub.i.v
00000014: pop.v.v depth
0000001C: push.imm.e 0
00000020: pop.v.i trans
00000028: push.imm.e 1
0000002C: conv.i.v
00000030: push.imm.e 0
00000034: conv.i.v
00000038: push.imm.e 654
0000003C: conv.i.v
00000040: call action_sprite_set(argc=3)
00000048: popz
0000004C: push.imm.e 2
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 159
00000060: conv.i.v
00000064: call action_if_number(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x21117CC
00000084: push.imm.e 2
00000088: conv.i.v
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 161
00000098: conv.i.v
0000009C: call action_if_number(argc=3)
000000A4: pop.v.v local.__b__
000000AC: push.local.v local.__b__
000000B4: conv.v.b
000000B8: bf 0x21117CC
000000BC: push.imm.e 621
000000C0: conv.i.v
000000C4: push.v obj617.y
000000CC: push.v obj617.x
000000D4: call instance_create(argc=3)
000000DC: popz