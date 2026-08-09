// gml_Object_cargo4_Mouse_4  locals=2 args=0 len=368
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.v preso
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x209F688
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.i 65280
0000005C: conv.i.v
00000060: push.imm.e 2
00000064: conv.i.v
00000068: push.imm.e 155
0000006C: conv.i.v
00000070: push.imm.e 246
00000074: conv.i.v
00000078: push.imm.e 2
0000007C: conv.i.v
00000080: call action_effect(argc=6)
00000088: popz
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.i 65280
0000009C: conv.i.v
000000A0: push.imm.e 2
000000A4: conv.i.v
000000A8: push.imm.e 227
000000AC: conv.i.v
000000B0: push.imm.e 375
000000B4: conv.i.v
000000B8: push.imm.e 2
000000BC: conv.i.v
000000C0: call action_effect(argc=6)
000000C8: popz
000000CC: push.imm.e 0
000000D0: conv.i.v
000000D4: call action_set_relative(argc=1)
000000DC: popz
000000E0: push.imm.e 1
000000E4: pop.v.i preso
000000EC: push.imm.e 1
000000F0: conv.i.v
000000F4: call action_set_relative(argc=1)
000000FC: popz
00000100: push.imm.e 1
00000104: conv.i.v
00000108: push.imm.e 0
0000010C: conv.i.v
00000110: push.imm.e 182
00000114: conv.i.v
00000118: call action_sprite_set(argc=3)
00000120: popz
00000124: push.imm.e 156
00000128: pushenv 0x209F684
0000012C: push.v oil
00000134: push.imm.e 3000
00000138: conv.i.v
0000013C: push.imm.e 2000
00000140: conv.i.v
00000144: call irandom_range(argc=2)
0000014C: add.v.v
00000150: pop.v.v oil
00000158: popenv 0x409F658
0000015C: push.imm.e 0
00000160: conv.i.v
00000164: call action_set_relative(argc=1)
0000016C: popz