// gml_Object_albe2_Create_0  locals=2 args=0 len=304
// locals: arguments, __b__
00000000: push.v y
00000008: neg.v.d
0000000C: pop.v.v depth
00000014: push.imm.e 2
00000018: conv.i.v
0000001C: call action_if_dice(argc=1)
00000024: pop.v.v local.__b__
0000002C: push.local.v local.__b__
00000034: conv.v.b
00000038: bf 0x213CCEC
0000003C: push.imm.e 2
00000040: conv.i.v
00000044: call action_if_dice(argc=1)
0000004C: pop.v.v local.__b__
00000054: push.local.v local.__b__
0000005C: conv.v.b
00000060: bf 0x213CCC0
00000064: push.imm.e 1
00000068: conv.i.v
0000006C: push.imm.e 0
00000070: conv.i.v
00000074: push.imm.e 1043
00000078: conv.i.v
0000007C: call action_sprite_set(argc=3)
00000084: popz
00000088: b 0x213CCE4
0000008C: push.imm.e 1
00000090: conv.i.v
00000094: push.imm.e 0
00000098: conv.i.v
0000009C: push.imm.e 1044
000000A0: conv.i.v
000000A4: call action_sprite_set(argc=3)
000000AC: popz
000000B0: exit
000000B4: b 0x213CD64
000000B8: push.imm.e 2
000000BC: conv.i.v
000000C0: call action_if_dice(argc=1)
000000C8: pop.v.v local.__b__
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x213CD3C
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.imm.e 0
000000EC: conv.i.v
000000F0: push.imm.e 1045
000000F4: conv.i.v
000000F8: call action_sprite_set(argc=3)
00000100: popz
00000104: b 0x213CD60
00000108: push.imm.e 1
0000010C: conv.i.v
00000110: push.imm.e 0
00000114: conv.i.v
00000118: push.imm.e 1046
0000011C: conv.i.v
00000120: call action_sprite_set(argc=3)
00000128: popz
0000012C: exit