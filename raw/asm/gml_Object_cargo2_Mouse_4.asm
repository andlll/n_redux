// gml_Object_cargo2_Mouse_4  locals=2 args=0 len=432
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
00000048: bf 0x209F41C
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.i 65535
0000005C: conv.i.v
00000060: push.imm.e 2
00000064: conv.i.v
00000068: push.imm.e 150
0000006C: conv.i.v
00000070: push.imm.e 213
00000074: conv.i.v
00000078: push.imm.e 2
0000007C: conv.i.v
00000080: call action_effect(argc=6)
00000088: popz
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.i 65535
0000009C: conv.i.v
000000A0: push.imm.e 2
000000A4: conv.i.v
000000A8: push.imm.e 250
000000AC: conv.i.v
000000B0: push.imm.e 392
000000B4: conv.i.v
000000B8: push.imm.e 2
000000BC: conv.i.v
000000C0: call action_effect(argc=6)
000000C8: popz
000000CC: push.imm.e 0
000000D0: conv.i.v
000000D4: push.i 65535
000000DC: conv.i.v
000000E0: push.imm.e 2
000000E4: conv.i.v
000000E8: push.imm.e 450
000000EC: conv.i.v
000000F0: push.imm.e 759
000000F4: conv.i.v
000000F8: push.imm.e 2
000000FC: conv.i.v
00000100: call action_effect(argc=6)
00000108: popz
0000010C: push.imm.e 0
00000110: conv.i.v
00000114: call action_set_relative(argc=1)
0000011C: popz
00000120: push.imm.e 1
00000124: pop.v.i preso
0000012C: push.imm.e 1
00000130: conv.i.v
00000134: call action_set_relative(argc=1)
0000013C: popz
00000140: push.imm.e 1
00000144: conv.i.v
00000148: push.imm.e 0
0000014C: conv.i.v
00000150: push.imm.e 179
00000154: conv.i.v
00000158: call action_sprite_set(argc=3)
00000160: popz
00000164: push.imm.e 156
00000168: pushenv 0x209F418
0000016C: push.v ele
00000174: push.imm.e 3000
00000178: conv.i.v
0000017C: push.imm.e 2000
00000180: conv.i.v
00000184: call irandom_range(argc=2)
0000018C: add.v.v
00000190: pop.v.v ele
00000198: popenv 0x409F3EC
0000019C: push.imm.e 0
000001A0: conv.i.v
000001A4: call action_set_relative(argc=1)
000001AC: popz