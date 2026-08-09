// gml_Object_albe_Create_0  locals=2 args=0 len=356
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: pop.v.i selva
0000000C: push.v y
00000014: neg.v.d
00000018: pop.v.v depth
00000020: push.imm.e 5
00000024: conv.i.v
00000028: call action_if_dice(argc=1)
00000030: pop.v.v local.__b__
00000038: push.local.v local.__b__
00000040: conv.v.b
00000044: bf 0x213CF58
00000048: push.imm.e 2
0000004C: conv.i.v
00000050: call action_if_dice(argc=1)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x213CF2C
00000070: push.imm.e 1
00000074: conv.i.v
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 1039
00000084: conv.i.v
00000088: call action_sprite_set(argc=3)
00000090: popz
00000094: b 0x213CF50
00000098: push.imm.e 1
0000009C: conv.i.v
000000A0: push.imm.e 0
000000A4: conv.i.v
000000A8: push.imm.e 1042
000000AC: conv.i.v
000000B0: call action_sprite_set(argc=3)
000000B8: popz
000000BC: exit
000000C0: b 0x213CFF8
000000C4: push.imm.e 2
000000C8: conv.i.v
000000CC: call action_if_dice(argc=1)
000000D4: pop.v.v local.__b__
000000DC: push.local.v local.__b__
000000E4: conv.v.b
000000E8: bf 0x213CFF8
000000EC: push.imm.e 2
000000F0: conv.i.v
000000F4: call action_if_dice(argc=1)
000000FC: pop.v.v local.__b__
00000104: push.local.v local.__b__
0000010C: conv.v.b
00000110: bf 0x213CFD0
00000114: push.imm.e 1
00000118: conv.i.v
0000011C: push.imm.e 0
00000120: conv.i.v
00000124: push.imm.e 1040
00000128: conv.i.v
0000012C: call action_sprite_set(argc=3)
00000134: popz
00000138: b 0x213CFF4
0000013C: push.imm.e 1
00000140: conv.i.v
00000144: push.imm.e 0
00000148: conv.i.v
0000014C: push.imm.e 1041
00000150: conv.i.v
00000154: call action_sprite_set(argc=3)
0000015C: popz
00000160: exit