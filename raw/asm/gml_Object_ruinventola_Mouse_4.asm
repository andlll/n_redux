// gml_Object_ruinventola_Mouse_4  locals=2 args=0 len=424
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x21396CC
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 11
00000028: conv.i.v
0000002C: push.v selec
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x21396CC
00000054: b 0x21396D4
00000058: popenv 0x4139690
0000005C: b 0x21396D8
00000060: popenv 0x1D396D4
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x2139808
00000074: push.imm.e 156
00000078: pushenv 0x213972C
0000007C: push.imm.e 4
00000080: conv.i.v
00000084: push.imm.e 20000
00000088: conv.i.v
0000008C: push.v mon
00000094: call action_if_variable(argc=3)
0000009C: pop.v.v local.__b__
000000A4: push.local.v local.__b__
000000AC: conv.v.b
000000B0: bf 0x213972C
000000B4: b 0x2139734
000000B8: popenv 0x41396F0
000000BC: b 0x2139738
000000C0: popenv 0x1D39734
000000C4: push.local.v local.__b__
000000CC: conv.v.b
000000D0: bf 0x2139808
000000D4: push.imm.e 156
000000D8: pushenv 0x2139768
000000DC: push.v mon
000000E4: push.imm.e -20000
000000E8: add.i.v
000000EC: pop.v.v mon
000000F4: popenv 0x4139750
000000F8: push.imm.e 0
000000FC: conv.i.v
00000100: push.imm.e -98
00000104: conv.i.v
00000108: push.imm.e 616
0000010C: conv.i.v
00000110: call action_create_object(argc=3)
00000118: popz
0000011C: push.imm.e 0
00000120: conv.i.v
00000124: push.imm.e 98
00000128: conv.i.v
0000012C: push.imm.e 616
00000130: conv.i.v
00000134: call action_create_object(argc=3)
0000013C: popz
00000140: push.imm.e -58
00000144: conv.i.v
00000148: push.imm.e 0
0000014C: conv.i.v
00000150: push.imm.e 616
00000154: conv.i.v
00000158: call action_create_object(argc=3)
00000160: popz
00000164: push.imm.e 58
00000168: conv.i.v
0000016C: push.imm.e 0
00000170: conv.i.v
00000174: push.imm.e 616
00000178: conv.i.v
0000017C: call action_create_object(argc=3)
00000184: popz
00000188: call action_kill_object(argc=0)
00000190: popz
00000194: push.imm.e 0
00000198: conv.i.v
0000019C: call action_set_relative(argc=1)
000001A4: popz