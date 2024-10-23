import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewsletterService } from '../../services/newsletter.service';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';

@Component({
  selector: 'newsletter-form',
  standalone: true,
  imports: [BtnPrimaryComponent, ReactiveFormsModule],
  providers: [NewsletterService],
  templateUrl: './newsletter-form.component.html',
  styleUrl: './newsletter-form.component.scss',
})
export class NewsletterFormComponent {
  form!: FormGroup;
  loading = signal(false);

  constructor(private service: NewsletterService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    this.loading.set(true);

    if (this.form.valid) {
      this.service
        .sendData(this.form.value.name, this.form.value.email)
        .subscribe({
          next: (resp) => {
            this.form.reset();
            console.log(resp);
          },
        });
      this.loading.set(false);
    }
  }
}
